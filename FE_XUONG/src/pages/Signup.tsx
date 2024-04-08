import { useLocalStorage } from '@/hooks/useStorage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import '../scss/signin.scss';


const signupSchema = Joi.object({
    email: Joi.string().required().min(3).email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().min(6).valid(Joi.ref('password')),
    name: Joi.string(),
    // avatar: Joi.string(),
})
const Signup = () => {
    const navigate = useNavigate();
    const [, setUser] = useLocalStorage('user', {});
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(signupSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
        }
    });

    const { mutate } = useMutation({
        mutationFn: async (formData: { email: string; password: string }) => {
            const { data } = await axios.post("http://localhost:8080/api/v1/auth/signup", formData);
            return data;
        },
        onSuccess: (data) => {
            setUser(data),
                toast({
                    title: "Đăng ký thành công",
                    variant: 'success'
                }),
                navigate('/signin')
        },
        onError: (error) => console.log(error)
    });
    const onSubmit = (formData: { email: string; password: string }) => {
        mutate(formData);
    }
    return (
        <section className='signup'>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className='title'>
                    <p className=''>Register form</p>
                </div>
                <div className='signin__username forminput'>
                    <label>Email:</label>
                    <input type="text"  {...register('email', { required: true, minLength: 3 })} placeholder='Email' />
                </div>
                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                <div className='signin__username forminput'>
                    <label>Name:</label>
                    <input type="text"  {...register('name')} placeholder='Name' />
                </div>
                {errors.name && <span className='text-red-500'>{errors.name.message}</span>}

                <div className='signin__password forminput'>
                    <label>Password:</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} placeholder='Password' />
                </div>
                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}

                <div className='signin__password forminput'>
                    <label>ConfirmPassword:</label>
                    <input type="password" {...register('confirmPassword', { required: true, minLength: 6 })} placeholder='ConfirmPassword' />
                </div>
                {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
                <div className='submit'>
                    <button type='submit'>Signup</button>
                </div>
                <div className='switchsignup'>
                    <p>
                        <Link to='/signin'>Login</Link>
                    </p>
                </div>
            </form>

        </section>
    )
}

export default Signup;