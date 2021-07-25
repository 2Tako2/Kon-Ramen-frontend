
export const MENU_ACTIONS = {
    LOAD_MENU: 'LOAD_MENU',
    CREATE_CATEGORY: 'CREATE_CATEGORY'
}

export const menuReducer = (menu, action) => {
    switch(action.type) {
        case MENU_ACTIONS.LOAD_MENU:
            return action.value
        case MENU_ACTIONS.CREATE_CATEGORY:
            return [...menu, {
                published: action.value,
                name: action.value
            }];
        default:
            return menu;
    }
}