export type UserProps = {
    login: string
    id: string
    html_url: string
    avatar_url: string
    repos_url: string
}

export type TitleProps = Pick<UserProps, "login" | "avatar_url" | "html_url">

export type InfoProps = {
    data: Record<string, string>
    name: "public_repos" | "location"
    isLoading?: boolean
}
