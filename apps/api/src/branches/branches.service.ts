import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) { }

  create(createBranchDto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: createBranchDto,
    });
  }

  findAll(organizationId: string) {
    return this.prisma.branch.findMany({
      where: { organizationId },
    });
  }

  findOne(id: string) {
    return this.prisma.branch.findUnique({
      where: { id },
      include: {
        organization: true,
      },
    });
  }

  update(id: string, updateBranchDto: UpdateBranchDto) {
    return this.prisma.branch.update({
      where: { id },
      data: updateBranchDto,
    });
  }

  remove(id: string) {
    return this.prisma.branch.delete({
      where: { id },
    });
  }
}
