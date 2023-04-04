import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export function useRequestForm(fn) {
    const router = useRouter()
    const store = useStore()

    const {handleSubmit, isSubmitting} = useForm({
        initialValues: {
            status: 'active'
        }
    })


    const {value:name, errorMessage: nError, handleBlur: nBlur} = useField('name',
        yup
            .string()
            .trim()
            .required('Поле имя должно быть заполнено')
            .min(3, 'Поле должно содержать не мение 3 символов')
    )
    const {value:phone, errorMessage: pError, handleBlur: pBlur} = useField('phone',
        yup
            .string()
            .trim()
            .required('Поле телефон должно быть заполнено')
            .min(10, 'Поле должно содержать не мение 10 символов')


    )
    const {value:summ, errorMessage: sError, handleBlur: sBlur} = useField('summ',
        yup.number('Поле должно быть числовым')
            .required('Поле сумма должно быть заполнено')
            .min(0, 'Поле сумма не может быть меньше 0')
    )
    const {value:status} = useField('status')

    const onSubmit = handleSubmit(fn)

    return {
        name, phone, summ, status, nError, pError, sError, nBlur, pBlur, sBlur, onSubmit, isSubmitting
    }
}