ng-roles
=============================

Access control library for angular applications

`bower install ng-roles --save`

# Usage
## Permissions
```javascript
accessControl.setPermissions(['roll', 'eat', 'sleep']);

expect(accessControl.can('wear socks')).toBeFalsy();
expect(accessControl.can('sleep')).toBeTruthy();
```

## Roles
```javascript
accessControl.setRoles(['superadmin', 'user']);

expect(accessControl.is('god')).toBeFalsy();
expect(accessControl.is('superadmin')).toBeTruthy();
expect(accessControl.is('user')).toBeTruthy();
```

## Unset
```javascript
//Unset will clear everything
accessControl.unset();
expect(accessControl.getPermissions()).toEqual([]);
expect(accessControl.getRoles()).toEqual([]);
```

# Use in views
You can expose the accessControl service in views (in the controller, or on $rootScope).
Then you are able to hide elements based on the current users permissions.

```html
<button ng-click="delete()" ng-show="User.is('administrator')">Delete something<button>
```
