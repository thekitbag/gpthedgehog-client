import TagManager from 'react-gtm-module'

const getIdFromEnv = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'GTM-M6LGSL5'
      } else {
        return 'GTM-5RRP5F4'
      }
}

const tagManagerArgs = {
    gtmId: getIdFromEnv()
}

const initGTM = () => {
    return TagManager.initialize(tagManagerArgs)
}

export default initGTM
