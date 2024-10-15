const getIdFromEnv = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'pk_test_51QAHVjC28JYJI4X0W9C7gMmHFfnaPV8KXrwY4LCSRXGXcvAjchVFe4MaqqNwYlPTY0xY0L3mNmop6Ibrv3JtEihw00CQAD95Mf'
      } else {
        return 'pk_live_51Q4pEAFfkjHZI58RrBVbo4wY3E8qboUlbw7g67pGuf9Soc1c5VE169XiA77NObqhvDSSMBJ6ZBwrS4n0I94qRJhe00KgChDv90'
      }
}

const stripePublishableKey = getIdFromEnv()

export default stripePublishableKey