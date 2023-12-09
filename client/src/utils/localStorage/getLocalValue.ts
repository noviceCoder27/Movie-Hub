export interface Item {
    token: string,
    expiry: Date
}

export const getFromLocal = () => {
    const str = localStorage.getItem("token");
    if(str) {
        const item: Item = JSON.parse(str);
        const {token,expiry} = item;
        
        if(new Date() > new Date(expiry)) {
            localStorage.removeItem("token");
            return null
        } else {
            return token;
        }
    } else {
        return null
    }
}