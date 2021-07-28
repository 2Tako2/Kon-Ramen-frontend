
export const initialCategory = {
    _id: '',
    published: false,
    name: '',
    editingMode: false
}

export const CATEGORY_ACTIONS = {
    SELECT_CATEGORY: 'SELECT_CATEGORY',
    ONCHANGE_PUBLISHED: 'ONCHANGE_PUBLISHED',
    ONCHANGE_NAME: 'ONCHANGE_NAME',
    RESET_CATEGORY: 'RESECT_CATEGORY'
}

export const categoryReducer = (category, action) => {
    switch (action.type) {
        case CATEGORY_ACTIONS.SELECT_CATEGORY:
            return { ...category, _id: action.value._id, published: action.value.published, name: action.value.name, editingMode: true};
        case CATEGORY_ACTIONS.ONCHANGE_PUBLISHED:
            return { ...category, published: action.value};
        case CATEGORY_ACTIONS.ONCHANGE_NAME:
            return { ...category, name: action.value};
        case CATEGORY_ACTIONS.RESET_CATEGORY:
            return initialCategory;
        default:
            return category;
    }
}