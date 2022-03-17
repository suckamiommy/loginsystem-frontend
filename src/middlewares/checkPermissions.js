import can from '../helpers/can';
import store from '../store';

export default function checkPermissions({next, to, from, router}) {
    const requiredPermissions = to.meta.permissions;
    if (!from.name) {
        store.dispatch('user/me').then(() => {
            const canEnter = can(requiredPermissions);

            if (canEnter) {
                return next();
            }

            return router.push({name: 'login'});
        });
    } else {
        const canEnter = can(requiredPermissions);

        if (canEnter) {
            return next();
        }

        return router.push({name: 'login'});
    }
}
