export const logEnv = (filter?: string) => {
    console.log(
        "keys in env: ",
        Object.keys(process.env)
            .filter((k) => k.toLowerCase().includes(filter ?? ""))
            .map((k) => `${k}: ${process.env[k]}`),
    )
}
