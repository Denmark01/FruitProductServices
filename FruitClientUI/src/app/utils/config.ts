export const config = {
    api: {
        getItems : 'getAll',
        uploadItems : 'uploadItem',
        auth: 'authenticate',
        feedback: 'feedback'
    }

};

export enum alertType  {
    success = 'success',
    warning = 'warning',
    info = 'info',
    danger = 'danger',
    primary = 'primary',
    secondary = 'secondary',
    light = 'light',
    dark = 'dark'
  }

export const alertMsg ={
    itemAdded: 'Item added in the cart..',
    cartUpadted: 'Cart updated..',
    alreadyAdded: 'Already added in cart..',
    feedback: 'Thanks for your feedback..',
    addQty: 'Please add quantity..'
}
