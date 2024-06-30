import './Navbar.css'

function Navbar(){
    const hasAccessToken = document.cookie.includes('accessToken');

    function handleLogOut(){
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
    }
    //SameSite=None
    return(
        
        <div className="background-Container">
            <ul className="listPlaceholder">
                <li className="listItem"><a href="/">Home</a></li>
                {hasAccessToken ? (
                    <>
                    <li className="listItem"><a href="/dashboard">Dashboard</a></li>
                    <li className='listItem'><a href='#' onClick={handleLogOut}>Log Out</a></li>
                    </>
                    
                ) : (
                    <>
                    <li className="listItem"><a href="/register">Register</a></li>
                    <li className="listItem"><a href="/login">Log In</a></li>
                    </>
                )}
            </ul>
        </div>
    );
}
export default Navbar;