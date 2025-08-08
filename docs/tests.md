# Test Cases

## 1. User Model & Authentication Tests

### Unit Tests (UserTest.php)

- **test_user_can_be_created**: Verify basic user creation
- **test_user_password_is_hashed**: Confirm that passwords are automatically hashed
- **test_user_has_role_relationship**: Verify Role relationship
- **test_user_has_registers_relationship**: Verify Register relationship

### Feature Tests (AuthenticationTest.php)

- **test_user_can_login_with_valid_credentials**: Login successful
- **test_user_cannot_login_with_invalid_credentials**: Login failed
- **test_user_can_logout**: Logout successful

## 2. Register Model Tests

### Unit Tests (RegisterTest.php)

- **test_register_can_be_created**: Basic creation
- **test_register_password_is_encrypted**: Verify password encryption
- **test_register_password_can_be_decrypted**: Verify decryption
- **test_register_has_owner_relationship**: Relationship to User
- **test_register_has_changes_relationship**: Relationship to Change

### Feature Tests (RegisterManagementTest.php)

- **test_user_can_create_register**: Create a new record
- **test_user_can_view_own_registers**: List own records
- **test_user_can_update_register**: Update a record
- **test_user_can_delete_register**: Delete a record
- **test_register_password_can_be_decrypted_if_authenticated**: Decryption security

## 3. Change Model Tests

### Feature Tests (RegisterChangesHistory.php)

- **test_change_is_created_when_register_is_created**: Automatic creation of changes
- **test_change_is_created_when_register_is_updated**: Automatic creation of changes
- **test_change_is_created_when_register_is_deleted**: Automatic creation of changes

## 4. Role Model Tests

### Unit Tests (RoleTest.php)

- **test_role_can_be_created**: Basic creation
- **test_role_has_many_users**: Relationship to User
- **test_role_permissions_are_defined**: Permission definition

## 5. Security Tests

### Feature Tests (SecurityTest.php)

- **test_csrf_protection_is_active**: CSRF protection
- **test_sql_injection_prevention**: SQL injection prevention
- **test_xss_protection**: XSS protection
- **test_rate_limiting_on_sensitive_endpoints**: Rate limiting
- **test_unauthorized_access_blocked**: Unauthorized access blocking
