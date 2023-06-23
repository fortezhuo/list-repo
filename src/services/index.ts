import axios from "axios"
import * as env from "lib/env"

export const services = {
    getUserInfo: async function (name: string) {
        return await axios(`${env.API_USER}/${name}`, {
            method: "GET"
        })
    },
    getListUser: async function (search: string) {
        return await axios(env.API_SEARCH, {
            method: "GET",
            params: {
                q: search,
                page: 1,
                per_page: 5
            }
        })
    },
    getListRepository: async function (url: string, page: number) {
        return await axios(url, {
            method: "GET",
            params: {
                page,
                per_page: env.PAGING
            }
        })
    }
}