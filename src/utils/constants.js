export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project-admin",
    MEMBER: "member"
}

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const TaskStatusEnum = {
    TO_DO: "to-do",
    IN_PROGRESS: "in-progress",
    REVIEW: "review",
    DONE: "done"
}

export const AvailableTaskStatuses = Object.values(TaskStatusEnum);