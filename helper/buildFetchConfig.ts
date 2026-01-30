import { ServiceOption } from "@/types";


const buildFetchConfig = (options?: ServiceOption): RequestInit => {
    const config: RequestInit = {};

    if (options?.cache) {
        config.cache = options.cache;
    }

    if (options?.revalidate) {
        config.next = { ...config.next, revalidate: options.revalidate };
    }
    if(options?.tags){
    config.next = {...config.next, tags: [options.tags]}

    }
    return config;
};

export default buildFetchConfig;