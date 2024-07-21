import { operators, dataTypes, typeORMOperators } from '../constant/queryBuilder.const';
import { Filter, Filters } from 'interface/filter.interface';

function validateFilter(filter: Filter): boolean {
  const dataType = dataTypes[filter.dataType];
  if (!dataType) {
    throw new Error(`Unknown data type: ${filter.dataType}`);
  }

  if (!operators[dataType].includes(filter.operator)) {
    throw new Error(`Invalid operator '${filter.operator}' for data type '${dataType}'`);
  }

  switch (dataType) {
    case 'number':
      if (typeof filter.value !== 'number' || isNaN(filter.value)) {
        throw new Error(`Invalid value '${filter.value}' for data type 'number'`);
      }
      break;
    case 'string':
      if (typeof filter.value !== 'string') {
        throw new Error(`Invalid value '${filter.value}' for data type 'string'`);
      }
      break;
    case 'boolean':
      if (typeof filter.value !== 'boolean') {
        throw new Error(`Invalid value '${filter.value}' for data type 'boolean'`);
      }
      break;
    // Add more cases for other data types
  }

  return true;
}

function mappingOperator(filter: Filter) {
  let operator = typeORMOperators[dataTypes[filter.dataType]][filter.operator];
  switch (filter.operator) {
    case 'equals':
    case 'not_equals':
    case 'greater_than':
    case 'less_than':
    case 'greater_than_equals':
    case 'less_than_equal':
      return `${operator} ${filter.value}`
    case 'contains':
      return `${operator} '${filter.value}' `
    case 'starts_with':
      return `${operator} '${filter.value}%' `
    case 'ends_with':
      return `${operator} '%${filter.value}' `
    default:
      break;
  }
  // add more operator
  return `${operator} ${filter.value}`;
}
export function buildFilterQuery(filters: Filters): { operand: string, operator: string, value: any }[] {
  const seenFilters = new Set<string>();
  return filters.reduce((acc, filter) => {
    try {
      if (validateFilter(filter)) {
        const filterString = `${filter.field}-${filter.operator}-${filter.value}`;
        if (!seenFilters.has(filterString)) {
          seenFilters.add(filterString);
          const operator = mappingOperator(filter);
          acc.push({
            operand: filter.field,
            operator: `${operator} `,
            value: filter.value
          });
        }
      }
    } catch (error) {
      console.error(error.message);
    }
    return acc;
  }, []);
}