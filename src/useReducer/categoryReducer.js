
export const initialCategory = {
    id: '',
    published: false,
    name: '',
    unitPrice: 0,
    description: '',
    thumbnail: '',
    category: '',
    categories: [],
    editingMode: false
}

export const CATEGORY_ACTIONS = {
    LOAD_CATEGORIES: 'LOAD_CATEGORIES',
    SELECT_CATEGORY: 'SELECT_CATEGORY',
    SELECT_ITEM: 'SELECT_ITEM',
    ONCHANGE_PUBLISHED: 'ONCHANGE_PUBLISHED',
    ONCHANGE_NAME: 'ONCHANGE_NAME',
    ONCHANGE_UNIT_PRICE: 'ONCHANGE_UNIT_PRICE',
    ONCHANGE_DESCRIPTION: 'ONCHANGE_DESCRIPTION',
    ONCHANGE_THUMBNAIL: 'ONCHANGE_THUMBNAIL',
    ONCHANGE_CATEGORY: 'ONCHANGE_CATEGORY',
    RESET_CATEGORY: 'RESECT_CATEGORY'
}

export const categoryReducer = (category, action) => {
    switch (action.type) {
        case CATEGORY_ACTIONS.LOAD_CATEGORIES:
            return { ...category, categories: action.value}
        case CATEGORY_ACTIONS.SELECT_CATEGORY:
            return {
                ...category,
                _id: action.value._id,
                published: action.value.published,
                name: action.value.name,
                editingMode: true
            };
        case CATEGORY_ACTIONS.SELECT_ITEM:
            return {
                ...category,
                _id: action.value._id,
                published: action.value.published,
                name: action.value.name,
                unitPrice: action.value.unitPrice,
                description: action.value.description,
                category: action.value.category,
                categories: action.value.categories,
                editingMode: true
            }

        case CATEGORY_ACTIONS.ONCHANGE_PUBLISHED:
            return { ...category, published: action.value};
        case CATEGORY_ACTIONS.ONCHANGE_NAME:
            return { ...category, name: action.value};
        case CATEGORY_ACTIONS.ONCHANGE_UNIT_PRICE:
            return { ...category, unitPrice: action.value};
        case CATEGORY_ACTIONS.ONCHANGE_DESCRIPTION:
            return { ...category, description: action.value};
        case CATEGORY_ACTIONS.ONCHANGE_THUMBNAIL:
            return { ...category, thumbnail: action.value};
        case CATEGORY_ACTIONS.ONCHANGE_CATEGORY:
            return { ...category, category: action.value};
        case CATEGORY_ACTIONS.RESET_CATEGORY:
            return {
                id: '',
                published: false,
                name: '',
                unitPrice: 0,
                description: '',
                thumbnail: '',
                category: '',
                categories: [],
                editingMode: false
            };
        default:
            return category;
    }
}