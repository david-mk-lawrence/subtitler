const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("")

// Generate a random string of alpha-numeric characters. It should go without
// saying that this function is not meant for crypto purposes :)
export const randomString = (length: number): string => {
    const text = new Array(length)

    for (let i = 0; i < length; i += 1) {
        text[i] = chars[Math.floor(Math.random() * chars.length)]
    }

    return text.join("")
}
