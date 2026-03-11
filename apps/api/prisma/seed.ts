import { PrismaClient, OrganizationType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ROLES = [
    { name: 'SUPER_ADMIN', level: 0 },
    { name: 'FOUNDER', level: 1 },
    { name: 'REGIONAL_LEADER', level: 2 },
    { name: 'BRANCH_PASTOR', level: 3 },
    { name: 'FINANCE_OFFICER', level: 4 },
    { name: 'DEPARTMENT_LEADER', level: 5 },
    { name: 'USHER', level: 6 },
    { name: 'MEMBER', level: 7 },
];

async function main() {
    console.log('🌱 Seeding database...');

    // 1. Create Default Organization
    let org = await prisma.organization.findFirst({ where: { name: 'EklesiaSuite Demo Church' } });
    if (!org) {
        org = await prisma.organization.create({
            data: {
                name: 'EklesiaSuite Demo Church',
                type: OrganizationType.INDEPENDENT_CHURCH,
            }
        });
    }
    console.log('✅ Organization:', org.name);

    // 2. Create HQ Branch
    let branch = await prisma.branch.findFirst({ where: { organizationId: org.id, name: 'Central Headquarters' } });
    if (!branch) {
        branch = await prisma.branch.create({
            data: {
                organizationId: org.id,
                name: 'Central Headquarters',
                address: 'Dar es Salaam, Tanzania',
            }
        });
    }
    console.log('✅ Branch:', branch.name);

    // 3. Create All Roles (7-tier hierarchy)
    const roleMap: Record<string, any> = {};
    for (const roleDef of ROLES) {
        let role = await prisma.role.findFirst({
            where: { organizationId: org.id, name: roleDef.name }
        });
        if (!role) {
            role = await prisma.role.create({
                data: {
                    organizationId: org.id,
                    name: roleDef.name,
                    level: roleDef.level,
                }
            });
        } else if (role.level !== roleDef.level) {
            // Ensure level is up to date
            role = await prisma.role.update({
                where: { id: role.id },
                data: { level: roleDef.level },
            });
        }
        roleMap[roleDef.name] = role;
        console.log(`  ✅ Role: ${roleDef.name} (level ${roleDef.level})`);
    }

    // 4. Create Admin User (Super Admin — level 0)
    const hashedPassword = await bcrypt.hash('Admin@1234', 10);
    await prisma.user.upsert({
        where: { email: 'admin@eklesia.com' },
        update: { roleId: roleMap['SUPER_ADMIN'].id },
        create: {
            organizationId: org.id,
            branchId: branch.id,
            roleId: roleMap['SUPER_ADMIN'].id,
            email: 'admin@eklesia.com',
            password: hashedPassword,
            firstName: 'System',
            lastName: 'Admin',
        }
    });
    console.log('✅ Admin user: admin@eklesia.com (SUPER_ADMIN)');

    // 5. Create a Usher test user
    await prisma.user.upsert({
        where: { email: 'usher@eklesia.com' },
        update: {},
        create: {
            organizationId: org.id,
            branchId: branch.id,
            roleId: roleMap['USHER'].id,
            email: 'usher@eklesia.com',
            password: hashedPassword,
            firstName: 'John',
            lastName: 'Usher',
        }
    });
    console.log('✅ Usher user: usher@eklesia.com (USHER)');

    // 6. Create a Finance Officer test user
    await prisma.user.upsert({
        where: { email: 'finance@eklesia.com' },
        update: {},
        create: {
            organizationId: org.id,
            branchId: branch.id,
            roleId: roleMap['FINANCE_OFFICER'].id,
            email: 'finance@eklesia.com',
            password: hashedPassword,
            firstName: 'Mary',
            lastName: 'Treasurer',
        }
    });
    console.log('✅ Finance user: finance@eklesia.com (FINANCE_OFFICER)');

    // 7. Create a Branch Pastor test user
    const usher = await prisma.user.upsert({
        where: { email: 'usher@eklesia.com' },
        update: {},
        create: {
            organizationId: org.id,
            branchId: branch.id,
            roleId: roleMap['USHER'].id,
            email: 'usher@eklesia.com',
            password: hashedPassword,
            firstName: 'John',
            lastName: 'Usher',
        }
    });

    const pastor = await prisma.user.upsert({
        where: { email: 'pastor@eklesia.com' },
        update: {},
        create: {
            organizationId: org.id,
            branchId: branch.id,
            roleId: roleMap['BRANCH_PASTOR'].id,
            email: 'pastor@eklesia.com',
            password: hashedPassword,
            firstName: 'Rev',
            lastName: 'Pastor',
        }
    });

    // 8. Create Departments
    const deptNames = ['Media & IT', 'Praise & Worship', 'Sunday School', 'Ushering', 'Men of Honor', 'Women of Excellence'];
    const depts = [];
    for (const name of deptNames) {
        const d = await prisma.department.upsert({
            where: { id: `dept-${name.toLowerCase().replace(/\s/g, '-')}` },
            update: { name },
            create: {
                id: `dept-${name.toLowerCase().replace(/\s/g, '-')}`,
                organizationId: org.id,
                name: name,
            }
        });
        depts.push(d);
    }

    // 9. Create Members/Visitors
    const membersData = [
        { firstName: 'James', lastName: 'Mshana', status: 'ACTIVE_MEMBER', deptIdx: 0 },
        { firstName: 'Sarah', lastName: 'Kimaro', status: 'ACTIVE_MEMBER', deptIdx: 1 },
        { firstName: 'Tumaini', lastName: 'Seki', status: 'VISITOR', deptIdx: -1 },
    ];

    for (const m of membersData) {
        await prisma.member.create({
            data: {
                organizationId: org.id,
                branchId: branch.id,
                firstName: m.firstName,
                lastName: m.lastName,
                status: m.status as any,
                departmentId: m.deptIdx >= 0 ? depts[m.deptIdx].id : null,
                registeredById: usher.id,
            }
        });
    }

    console.log('\n🎉 Seeding complete!');
    console.log('─────────────────────────────────────');
    console.log('Test accounts (password: Admin@1234)');
    console.log('  admin@eklesia.com    → SUPER_ADMIN');
    console.log('  pastor@eklesia.com   → BRANCH_PASTOR');
    console.log('  finance@eklesia.com  → FINANCE_OFFICER');
    console.log('  usher@eklesia.com    → USHER');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
