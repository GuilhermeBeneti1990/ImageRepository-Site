'use client'
import { Button, InputText, Template, FieldError } from "@/components";
import { useNotification } from "@/hooks";
import { useState } from "react";
import { LoginFormProps, formSchema, formValidationSchema} from "./formSchema";
import { useFormik } from "formik";
import { useAuth } from "@/resources";
import { useRouter } from "next/navigation";
import { AccessToken, Credentials, User } from "@/resources/user/user.resource";

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const [isNewUser, setIsNewUser] = useState<boolean>(false);

    const auth = useAuth();
    const router = useRouter();
    const notification = useNotification();

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginFormProps>({
        initialValues: formSchema,
        validationSchema: formValidationSchema,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginFormProps) {
        if(!isNewUser) {
            const credentials: Credentials = {
                email: values.email,
                password: values.password
            };
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                auth.isSessionValid();
                router.push("/gallery");
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, "error");
            }
        } else {
            const user: User = {
                email: values.email,
                name: values.name,
                password: values.password
            }
            try {
                await auth.register(user);
                notification.notify("Success on saving user.", "success");
                resetForm();
                setIsNewUser(false);
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, "error");
            }
        }
    }

    return (
        <Template loading={loading}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900">
                        {isNewUser ? "Create New User" : "Login to Your Account"}
                    </h2>
                </div>

                <div className="mt=10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {isNewUser && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                                </div>
                                <div className="mt-2">
                                    <InputText style="w-full" id="name" placeholder="Type your name" value={values.name} onChange={handleChange} />
                                    <FieldError error={errors.name} />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                        </div>
                        <div className="mt-2">
                            <InputText style="w-full" id="email" placeholder="Type your e-mail" value={values.email} onChange={handleChange} />
                            <FieldError error={errors.email} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                        </div>
                        <div className="mt-2">
                            <InputText type="password" style="w-full" id="password" placeholder="Type your password" value={values.password} onChange={handleChange} />
                            <FieldError error={errors.password} />
                        </div>

                        {isNewUser && (
                            <>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Confirm your password:</label>
                            </div>
                            <div className="mt-2">
                                <InputText type="password" style="w-full" id="passwordConfirm" placeholder="Confirm your password" value={values.passwordConfirm} onChange={handleChange} />
                                <FieldError error={errors.passwordConfirm} />
                            </div>
                            </>
                        )}

                        <div className="space-y-4">
                            {isNewUser && (
                                <>
                                    <Button type="submit" style="bg-indigo-700 hover:bg-indigo-500" label="Register"/>
                                    <Button type="button" style="bg-red-700 hover:bg-red-500 mx-2" label="Cancel" onClick={event => setIsNewUser(false)} />
                                </>
                            )}

                            {!isNewUser && (
                                <>
                                    <Button type="submit" style="bg-indigo-700 hover:bg-indigo-500" label="Login"/>
                                    <Button type="button" style="bg-red-700 hover:bg-red-500 mx-2" label="Register" onClick={event => setIsNewUser(true)} />
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    )
}