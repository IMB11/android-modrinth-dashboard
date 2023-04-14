import { reactive } from 'vue'

export const store = reactive({
    user: {},
    payoutInfo: {},
    notifications: [
        {
            "id": "UUVVWWXX",
            "user_id": "EEFFGGHH",
            "type": "project_update",
            "title": "**My Project** has been updated!",
            "text": "The project, My Project, has released a new version: 1.0.0",
            "link": "mod/AABBCCDD/version/IIJJKKLL",
            "read": false,
            "created": "string",
            "actions": [
                {}
            ]
        }
    ],
})