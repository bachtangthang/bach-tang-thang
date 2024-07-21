export type DataType = 'number' | 'string' | 'boolean';

export const dataTypes: { [key: number]: DataType } = {
	1: 'number',
	2: 'string',
	3: 'boolean',
};

export const operators: { [key in DataType]: string[] } = {
	number: ['equals', 'greater_than', 'less_than', 'greater_than_equals', 'less_than_equal', 'not_equals'],
	string: ['contains', 'starts_with', 'ends_with'],
	boolean: ['equals'],
};

export const typeORMOperators: { [key in DataType]: { [operator: string]: string } } = {
	number: {
	  equals: '=',
	  greater_than: '>',
	  less_than: '<',
		not_equals: '=',
		greater_than_equals: '>=',
		less_than_equal: '<='
	},
	string: {
	  equals: '=',
	  contains: 'LIKE',
	  starts_with: 'LIKE',
	  ends_with: 'LIKE'
	},
	boolean: {
	  equals: '='
	}
};
