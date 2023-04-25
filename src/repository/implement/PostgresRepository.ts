import { Url, User } from '@prisma/client';
import { createHash } from 'crypto';
import { prisma } from '../../database/client';
import { ILoginProps, IRepository } from '../IRepository';

export class PostgresRepository implements IRepository {
	private createMd5(password: string): string {
		const hash = createHash('md5');
		hash.update(password);
		return hash.digest('hex');
	}

	async findUserByLogin(props: ILoginProps): Promise<User | null> {
		const authenticatedUser = await prisma.user.findFirst({
			where: {
				email: props.email,
				password: this.createMd5(props.password),
			},
			include: {
				urls: true,
			},
		});

		return authenticatedUser;
	}

	async findUserById(id: string): Promise<User | null> {
		const findUser = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				urls: true,
			},
		});

		return findUser;
	}

	async findAllUsers(): Promise<User[]> {
		const allUsers = await prisma.user.findMany();

		return allUsers;
	}

	async createUser(user: User): Promise<User> {
		const newUser = await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: this.createMd5(user.password),
			},
		});

		return newUser;
	}

	async updateUser(id: string, user: Partial<User>): Promise<User | null> {
		const updatedUser = await prisma.user.update({
			where: {
				id,
			},
			data: user,
			include: {
				urls: true,
			},
		});

		return updatedUser;
	}

	async deleteUser(id: string): Promise<void> {
		await prisma.user.delete({
			where: {
				id,
			},
		});
	}

	async addUrlInUser(id: string, url: Url): Promise<User | null> {
		const updatedUser = await prisma.user.update({
			where: {
				id,
			},
			data: {
				urls: {
					create: [url],
				},
			},
			include: {
				urls: true,
			},
		});

		return updatedUser;
	}

	async findUrlByUri(uri: string): Promise<Url | null> {
		const findUrl = await prisma.url.findUnique({
			where: {
				uri,
			},
		});

		return findUrl;
	}

	async removeUrlByUri(uri: string): Promise<void> {
		await prisma.url.delete({
			where: {
				uri,
			},
		});
	}
}
