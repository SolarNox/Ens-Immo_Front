export default function(userData = {invited: false, setHouseDone: false}, action) {
    if(action.type === 'setUserData') {

        var userDataCopy = {
        ...userData,
        lastName: action.name,
        firstName: action.firstName,
        email: action.email,
        telephone: action.tel,
        telephone2: undefined,
        sexe: undefined,
        token: action.token,
        };

        return userDataCopy;
    } if (action.type === 'updateUserData'){

        var userDataCopy = {
            ...userData,
            [action.name]: action.value
            };

        return userDataCopy;
    } if (action.type === 'updateImmoData'){

        var userDataCopy = {
            ...userData,
            setHouseDone: action.setHouseDone
            };

        return userDataCopy;
    } if (action.type === 'inviteUserData'){

        var userDataCopy = {
            ...userData,
            email: action.email,
            invited: true
            };

        return userDataCopy;
    } else {
        return userData;
    }
}