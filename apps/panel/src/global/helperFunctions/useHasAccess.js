const useHasAccess = () => {
  const userRoles = localStorage.getItem('roles');

  const rolesList = userRoles ? userRoles.split(',') : [];
  let roles = {};

  rolesList.map((item) => {
    if (!item.includes('-')) return;
    const role = item.split('-').map((name) => name.charAt(0).toLowerCase() + name.slice(1));
    roles = { ...roles, [role[0]]: { ...roles[role[0]], any: true, [role[1]]: true } };
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const hasAccessTo = (passedRole, test, restrict) => {
    return true;
    // if (test) return false;
    // if (!userRoles) return false;
    // if (!restrict && rolesList.includes('Admin')) return true;
    // if (!restrict && rolesList.includes('SuperAdmin')) return true;
    // return !!passedRole;
  };
  // console.log(roles);
  return { roles, hasAccessTo };
};

export default useHasAccess;
