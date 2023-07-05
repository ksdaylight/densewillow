import { Injectable } from '@nestjs/common';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Post, Prisma } from '@prisma/client/blog';

import { PrismaService } from './prisma.service';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async post(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput,
        });
    }

    async posts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }): Promise<Post[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.post.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prisma.post.create({
            data,
        });
    }

    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<Post> {
        const { data, where } = params;
        return this.prisma.post.update({
            data,
            where,
        });
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prisma.post.delete({
            where,
        });
    }
}
/*

import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

class PostService {
  async getPosts(): Promise<Prisma.PostGetPayload<{}>[]> {
    const posts = await prisma.post.findMany();
    return posts.map(post => this.serializePost(post, "list"));
  }

  async getPostDetail(id: string): Promise<Prisma.PostGetPayload<{}>> {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    return this.serializePost(post, "detail");
  }

  private serializePost(post: Prisma.PostGetPayload<{}>, group: "list" | "detail"): Prisma.PostGetPayload<{}> {
    if (group === "list") {
      // For the list group, we exclude the content field
      const { content, ...rest } = post;
      return rest;
    } else {
      // For the detail group, we return all fields
      return post;
    }
  }
}
分组、（序列化）示例


 */
