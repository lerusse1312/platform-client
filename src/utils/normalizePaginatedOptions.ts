import {Paginated} from '../resources';
import {DeprecatedPaginated} from '../resources/InternalBaseInterface';

export const normalizePaginatedOptions = (options: Paginated | DeprecatedPaginated): DeprecatedPaginated => {
    if (isDeprecatedPaginated(options)) {
        return options;
    } else {
        const {perPage: _, ...copiedOptions} = {...options, pageSize: options.perPage};
        return copiedOptions;
    }
};

const isDeprecatedPaginated = (options: any): options is DeprecatedPaginated => {
    const keys = Object.keys(options);
    if (!keys.includes('perPage')) {
        return true;
    }
    if (keys.includes('pageSize')) {
        throw new Error(
            'The Pagination options are invalid: both pageSize and perPage have been set. Use only one of them.'
        );
    }
    return false;
};
