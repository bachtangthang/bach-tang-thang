class Entries {
	total: number;
	data: any[];
	constructor(total: number, data: any[]) {
		this.total = total;
		this.data = data;
	}
}
class HttpResponse {
	public status: number;
	public message: string;
	public entries: Entries;
	constructor(status: number, message: string, entries?: Entries) {
		this.status = status;
		this.message = message;
		this.entries = new Entries(entries.total, entries.data);
	}
}
	
export default HttpResponse;