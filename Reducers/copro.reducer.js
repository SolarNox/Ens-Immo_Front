export default function(coproData = {}, action) {
        if(action.type === 'setCoproData') {
    
            var coproDataCopy = {
            ...coproData,
            _id: action._id,
            nom: action.name,
            email: action.email,
            tel: action.tel,
            tokenPrez: action.tokenPrez,
            conseilSyndicalTokens: action.usersToken,
            syndicUsers: []
            };
            coproDataCopy.syndicUsers.push(action.usersCopro)
    
            return coproDataCopy;
        } if (action.type === 'inviteUserData'){

            var coproDataCopy = {
                ...coproData,
                _id: action.coproId,
                };
    
            return coproDataCopy;
        } else {
            return coproData;
        }
    }