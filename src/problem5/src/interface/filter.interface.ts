type filterValue = number | string | boolean;

export interface Filter {
	field: string;
	dataType: number;
	value: filterValue;
	operator: string;
}

export type Filters = Filter[];

export type SortOrder = 'ASC' | 'DESC';
