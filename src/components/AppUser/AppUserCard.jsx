const AppUserCard = ({appUser}) => {
    return(

        <div>
            <div>
                <h3>Nombre:</h3>
                <p>{appUser.firstName} {appUser.lastName}</p>
            </div>
            <div>
                <h3>Email:</h3>
                <p>{appUser.email}</p>
            </div>
        </div>
    )
}

export default AppUserCard;