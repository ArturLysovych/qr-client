interface ScanHistory {
	date: string;
	totalScans: number;
	_id: string;
}

export interface IProduct {
	_id: string;
	name: string;
	price: number;
	image: string;
	__v: number;
}

export interface IUser {
	_id: string;
	id: string;
	lastScanned: string;
	timesScanned: number;
	requests: IRequest[];
	scanHistory: ScanHistory[];
	__v: number;
	name: string;
	surname: string;
}

export interface IRequest {
	_id: string;
	userId: IUser;
	productId: IProduct;
	__v: number;
}