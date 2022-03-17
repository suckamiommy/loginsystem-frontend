
export default function resetPassword({next, router}) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const token = params.get("token");
    if(!token){
        return router.push({name: 'login'});
    }

    return next();
}