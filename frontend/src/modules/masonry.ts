import { UserModule } from '~/types'
import masonry from 'vue-next-masonry';

export const install: UserModule = ({ app, isClient, initialState }) => {
    if (!isClient)
    return
    
    app.use(masonry)

  // do something
}