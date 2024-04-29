import { useLocalStorage } from '@/hooks/useStorage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';


const signinSchema = Joi.object({
    email: Joi.string().required().min(3).email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
})
const Signin = () => {
    const navigate = useNavigate();
    const [, setUser] = useLocalStorage('user', {});
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(signinSchema),
        defaultValues: {
            email: "",
            password: '',
        }
    });

    const { mutate } = useMutation({
        mutationFn: async (formData: { email: string; password: string }) => {
            const { data } = await axios.post("http://localhost:8080/api/v1/auth/signin", formData);
            return data;
        },
        onSuccess: (data) => {
            setUser(data),
                toast({
                    title: 'Welcome back !',
                    variant: 'success',
                    duration: 3000,
                }),
                console.log(data),
                setTimeout(() => {
                    navigate('/');
                }, 500)
        },
        onError: (error: any) => {
            alert('Sai thông tin đăng nhập, vui lòng kiểm tra lại'),
                console.log(error);
        }
    });

    const onSubmit = (formData: { email: string; password: string }) => {
        mutate(formData);
    }
    return (
        <section className='signin'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='title'>
                    <p className=''>Login form</p>
                </div>
                <div className='signin__username forminput'>
                    <label>Email:</label>
                    <input type='text' id='email' {...register('email', { required: true })} placeholder='Email' />
                </div>
                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                <div className='signin__password forminput'>
                    <label>Password</label>
                    <input type='password' id='password' {...register('password', { required: true, minLength: 6 })} placeholder='Password' />
                </div>
                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                <div className='submit'>
                    <button type='submit' className=''>
                        Signin
                    </button>
                </div>
                <div className='switchsignup'>
                    <p>
                        Dont have account ? <Link to='/signup'>Register now</Link>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default Signin