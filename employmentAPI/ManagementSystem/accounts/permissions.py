from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        # Assuming the role is stored in a 'role' field in the User model
        return request.user.is_authenticated and request.user.role == "Admin"


class IsManager(permissions.BasePermission):

    def has_permission(self, request, view):
        # Assuming the role is stored in a 'role' field in the User model
        return request.user.is_authenticated and request.user.role == "Manager"


class IsAdminManagerOrEmployee(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.role in ["Admin", "Manager"]:
            return True

        # Employees can only access their own data
        return obj.user == request.user
