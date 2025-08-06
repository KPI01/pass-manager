# Essential Test Cases - Laravel + React Password Manager

## BACKEND - Laravel Tests

### 1. User Model & Authentication Tests

#### Unit Tests (UserTest.php)

- **user can be created**: Verify basic user creation
- **user password is hashed**: Confirm that passwords are automatically hashed
- **user has role relationship**: Verify Role relationship
- **user has registers relationship**: Verify Register relationship

#### Feature Tests (AuthenticationTest.php)

- **test_user_can_login_with_valid_credentials**: Login successful
- **test_user_cannot_login_with_invalid_credentials**: Login failed
- **test_user_can_logout**: Logout successful
- **test_user_session_expires_after_inactivity**: Session timeout
- **test_password_reset_functionality**: Password reset

### 2. Register Model Tests

#### Unit Tests (RegisterTest.php)

- **test_register_can_be_created**: Basic creation
- **test_register_password_is_encrypted**: Verify password encryption
- **test_register_password_can_be_decrypted**: Verify decryption
- **test_register_belongs_to_user**: Relationship to User
- **test_register_has_many_changes**: Relationship to Change
- **test_register_login_field_validation**: Login field validation
- **test_register_password_field_validation**: Password field validation

#### Feature Tests (RegisterManagementTest.php)

- **test_user_can_create_register**: Create a new record
- **test_user_can_view_own_registers**: List own records
- **test_user_cannot_view_others_registers**: Access restrictions
- **test_user_can_update_register**: Update a record
- **test_user_can_delete_register**: Delete a record
- **test_register_password_decryption_requires_authentication**: Decryption security
- **test_register_search_functionality**: Search for records

### 3. Change Model Tests

#### Unit Tests (ChangeTest.php)

- **test_change_can_be_created**: Basic creation
- **test_change_belongs_to_register**: Relationship to Register
- **test_change_stores_previous_values**: Storing previous values
- **test_change_timestamps_are_recorded**: Recording timestamps

#### Feature Tests (ChangeHistoryTest.php)

- **test_change_is_created_when_register_is_updated**: Automatic creation of changes
- **test_user_can_view_register_history**: Viewing history
- **test_change_history_is_paginated**: History pagination
- **test_change_history_shows_field_differences**: Displaying specific differences

### 4. Role Model Tests

#### Unit Tests (RoleTest.php)

- **test_role_can_be_created**: Basic creation
- **test_role_has_many_users**: Relationship to User
- **test_role_permissions_are_defined**: Permission definition

#### Feature Tests (RolePermissionTest.php)

- **test_admin_can_access_all_features**: Administrator permissions
- **test_regular_user_has_limited_access**: Regular user permissions
- **test_role_based_register_access**: Role-based access

### 5. Security Tests

#### Feature Tests (SecurityTest.php)

- **test_csrf_protection_is_active**: CSRF protection
- **test_sql_injection_prevention**: SQL injection prevention
- **test_xss_protection**: XSS protection
- **test_rate_limiting_on_sensitive_endpoints**: Rate limiting
- **test_password_decryption_audit_trail**: Decryption audit
- **test_unauthorized_access_blocked**: Unauthorized access blocking
- **test_encryption_key_rotation**: Encryption key rotation

### 6. API Tests

#### Feature Tests (ApiTest.php)

- **test_api_authentication_required**: Authentication required
- **test_api_returns_proper_json_structure**: Correct JSON structure
- **test_api_error_handling**: Error handling
- **test_api_filtering_and_sorting**: Filtering and sorting
