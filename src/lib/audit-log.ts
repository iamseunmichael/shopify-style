
export function logAudit(action: string, userId: string) {
    console.log(JSON.stringify({
        action,
        userId,
        timeStamp: new Date().toISOString(),
    }))
}