export class Post {
	constructor(public title: string,
		public text: string,
		public date: number,
		public approval: number,
		public authorId: string) {}
}