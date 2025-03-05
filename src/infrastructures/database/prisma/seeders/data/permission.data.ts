export const profile = [
  {
    module: 'Profile',
    action: 'View',
    slug: 'profile:view',
    use: ['superadmin', 'admin', 'staff'],
  },
  {
    module: 'Profile',
    action: 'Update',
    slug: 'profile:update',
    use: ['superadmin', 'admin', 'staff'],
  },
  {
    module: 'Profile',
    action: 'Update Username',
    slug: 'profile:update-username',
    use: ['superadmin', 'admin', 'staff'],
  },
  {
    module: 'Profile',
    action: 'Update Password',
    slug: 'profile:update-password',
    use: ['superadmin', 'admin', 'staff'],
  },
  {
    module: 'Profile',
    action: 'Delete',
    slug: 'profile:delete',
    use: ['superadmin', 'admin', 'staff'],
  },
];

export const user = [
  {
    module: 'User',
    action: 'View',
    slug: 'user:view',
    use: ['superadmin', 'admin', 'staff'],
  },
  {
    module: 'User',
    action: 'Create',
    slug: 'user:create',
    use: ['superadmin', 'admin', 'staff'],
  },
  {
    module: 'User',
    action: 'Update',
    slug: 'user:update',
    use: ['superadmin', 'admin', 'staff'],
  },
  {
    module: 'User',
    action: 'Delete',
    slug: 'user:delete',
    use: ['superadmin', 'admin', 'staff'],
  },
];

export const access = [
  {
    module: 'Access',
    action: 'View',
    slug: 'access:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Access',
    action: 'Create',
    slug: 'access:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Access',
    action: 'Update',
    slug: 'access:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Access',
    action: 'Delete',
    slug: 'access:delete',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Access',
    action: 'Assignment',
    slug: 'access:assignment',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Access',
    action: 'Permission',
    slug: 'access:permission',
    use: ['superadmin', 'admin'],
  },
];

export const account = [
  {
    module: 'Account',
    action: 'View',
    slug: 'account:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Account',
    action: 'Create',
    slug: 'account:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Account',
    action: 'Update',
    slug: 'account:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Account',
    action: 'Access Control',
    slug: 'account:access-control',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Account',
    action: 'Update Username',
    slug: 'account:update-username',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Account',
    action: 'Update Status',
    slug: 'account:update-status',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Account',
    action: 'Update Password',
    slug: 'account:update-password',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'Account',
    action: 'Delete',
    slug: 'account:delete',
    use: ['superadmin', 'admin'],
  },
] as const;

export const cms = [
  {
    module: 'CMS Site',
    action: 'View',
    slug: 'cms:site:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site',
    action: 'Create',
    slug: 'cms:site:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site',
    action: 'Update',
    slug: 'cms:site:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site',
    action: 'Delete',
    slug: 'cms:site:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Site Contact
  {
    module: 'CMS Site Contact',
    action: 'View',
    slug: 'cms:site-contact:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Contact',
    action: 'Create',
    slug: 'cms:site-contact:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Contact',
    action: 'Update',
    slug: 'cms:site-contact:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Contact',
    action: 'Delete',
    slug: 'cms:site-contact:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Site Link
  {
    module: 'CMS Site Link',
    action: 'View',
    slug: 'cms:site-link:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Link',
    action: 'Create',
    slug: 'cms:site-link:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Link',
    action: 'Update',
    slug: 'cms:site-link:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Link',
    action: 'Delete',
    slug: 'cms:site-link:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Site Menu
  {
    module: 'CMS Site Menu',
    action: 'View',
    slug: 'cms:site-menu:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Menu',
    action: 'Create',
    slug: 'cms:site-menu:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Menu',
    action: 'Update',
    slug: 'cms:site-menu:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Menu',
    action: 'Delete',
    slug: 'cms:site-menu:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Site Menu Group
  {
    module: 'CMS Site Menu Group',
    action: 'View',
    slug: 'cms:site-menu-group:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Menu Group',
    action: 'Create',
    slug: 'cms:site-menu-group:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Menu Group',
    action: 'Update',
    slug: 'cms:site-menu-group:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Site Menu Group',
    action: 'Delete',
    slug: 'cms:site-menu-group:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Page
  {
    module: 'CMS Page',
    action: 'View',
    slug: 'cms:page:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Page',
    action: 'Create',
    slug: 'cms:page:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Page',
    action: 'Update',
    slug: 'cms:page:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Page',
    action: 'Delete',
    slug: 'cms:page:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Category
  {
    module: 'CMS Category',
    action: 'View',
    slug: 'cms:category:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Category',
    action: 'Create',
    slug: 'cms:category:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Category',
    action: 'Update',
    slug: 'cms:category:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Category',
    action: 'Delete',
    slug: 'cms:category:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Category Group
  {
    module: 'CMS Category Group',
    action: 'View',
    slug: 'cms:category-group:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Category Group',
    action: 'Create',
    slug: 'cms:category-group:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Category Group',
    action: 'Update',
    slug: 'cms:category-group:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Category Group',
    action: 'Delete',
    slug: 'cms:category-group:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Section Image
  {
    module: 'CMS Section Image',
    action: 'View',
    slug: 'cms:section-image:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Section Image',
    action: 'Create',
    slug: 'cms:section-image:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Section Image',
    action: 'Update',
    slug: 'cms:section-image:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Section Image',
    action: 'Delete',
    slug: 'cms:section-image:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Section
  {
    module: 'CMS Section',
    action: 'View',
    slug: 'cms:section:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Section',
    action: 'Create',
    slug: 'cms:section:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Section',
    action: 'Update',
    slug: 'cms:section:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Section',
    action: 'Delete',
    slug: 'cms:section:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Section Group
  {
    module: 'CMS Section Group',
    action: 'View',
    slug: 'cms:section-group:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Section Group',
    action: 'Create',
    slug: 'cms:section-group:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Section Group',
    action: 'Update',
    slug: 'cms:section-group:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Section Group',
    action: 'Delete',
    slug: 'cms:section-group:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Form Field
  {
    module: 'CMS Form Field',
    action: 'View',
    slug: 'cms:form-field:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Form Field',
    action: 'Create',
    slug: 'cms:form-field:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Form Field',
    action: 'Update',
    slug: 'cms:form-field:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Form Field',
    action: 'Delete',
    slug: 'cms:form-field:delete',
    use: ['superadmin', 'admin'],
  },
  // CMS Form
  {
    module: 'CMS Form',
    action: 'View',
    slug: 'cms:form:view',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Form',
    action: 'Create',
    slug: 'cms:form:create',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Form',
    action: 'Update',
    slug: 'cms:form:update',
    use: ['superadmin', 'admin'],
  },
  {
    module: 'CMS Form',
    action: 'Delete',
    slug: 'cms:form:delete',
    use: ['superadmin', 'admin'],
  },
] as const;

export const permissions = [...profile, ...access, ...user, ...account, ...cms] as const;
