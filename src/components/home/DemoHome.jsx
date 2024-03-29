import Link from 'next/link';
import demo_img from '@/../public/demo_img.png'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import saveContact from '@/api/save_contact';
import { useRouter } from 'next/router';

export default function DemoHome() {
    const router = useRouter()
    const [done, setDone] = useState(false)
    const [formData, setFormData] = useState({
        "contactId": 0,
        "fio": '',
        "company": '',
        "phoneNumber": '',
        "email": ''
    })

    const handleDemoClick = () => {
        const demo = document.getElementById('demo');
        demo.scrollIntoView({ behavior: 'smooth' });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        submitContact()
    }

    const submitContact = async () => {
        const result = await saveContact(formData)
        if (result.success) {
            setDone(true)
        } else {
            alert(result.message)
        }
    }

    const features = [
        {
            icon:
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={128}
                    height={128}
                    className="cloud-backup-svgrepo-com_svg__icon"
                    viewBox="0 0 1024 1024"
                >
                    <path
                        fill="#FFF"
                        d="M464.8 409.7C431.9 365 378.9 336 319.2 336c-99.8 0-180.7 80.9-180.7 180.7s80.9 180.7 180.7 180.7h297.3c149.3 0 270.3-121 270.3-270.3s-121-270.3-270.3-270.3c-118.7 0-219.6 76.5-255.9 183"
                    />
                    <path
                        fill="#6a6a6a"
                        d="M823.5 766.5c0-3.2.5-6.3 1.5-9.2H631V417.4c0-5.5-4.5-10-10-10s-10 4.5-10 10v359.9h214.6c-1.3-3.3-2.1-7-2.1-10.8z"
                    />
                    <path
                        fill="#E6E6E6"
                        d="M230.2 791.7c-3.5-8.7-12-14.9-22-14.9-13.1 0-23.7 10.6-23.7 23.7s10.6 23.7 23.7 23.7c9.5 0 17.7-5.6 21.5-13.7 1.4-3 2.2-6.4 2.2-10 0-3.1-.6-6.1-1.7-8.8z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M852.2 737.9c-12.6 0-23.3 8.1-27.1 19.4-1 2.9-1.5 6-1.5 9.2 0 3.8.7 7.4 2.1 10.8 4.3 10.5 14.5 17.9 26.6 17.9 15.8 0 28.7-12.8 28.7-28.7-.1-15.8-13-28.6-28.8-28.6zM700 257.7c2.1-5.1-.3-11-5.4-13.1-78-32.3-135.3-15.6-169.6 4.1-37.2 21.3-55.7 50.2-56.4 51.5-2.9 4.7-1.5 10.8 3.1 13.8 1.7 1 3.5 1.5 5.3 1.5 3.3 0 6.6-1.6 8.5-4.6.2-.3 17.1-26.4 50.2-45.2 44.1-24.9 94.9-25.8 151.2-2.5 5.1 2 11-.4 13.1-5.5z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M852.2 819.8c-12.4 0-22.9 7.8-26.9 18.8H534.5V717.3H611v-40h-76.5V537.9c0-5.5-4.5-10-10-10s-10 4.5-10 10v139.4h-66.9V537.9c0-5.5-4.5-10-10-10s-10 4.5-10 10v139.4H319.2c-88.6 0-160.7-72.1-160.7-160.7s72.1-160.7 160.7-160.7c50.9 0 99.3 24.5 129.5 65.6 6.5 8.9 19.1 10.8 28 4.3 8.9-6.5 10.8-19.1 4.3-28-18.3-24.8-42.4-45.4-69.7-59.5-7.9-4.1-16.1-7.7-24.5-10.7 39.3-91 129.3-150.8 229.8-150.8 138 0 250.3 112.3 250.3 250.3 0 133.1-104.4 242.2-235.7 249.8V717c72.1-3.5 139.3-33.3 190.7-84.7 54.8-54.8 85-127.7 85-205.2s-30.2-150.4-85-205.2c-54.8-54.8-127.7-85-205.2-85-118.8 0-224.9 72.1-269.1 181.2-9.3-1.3-18.8-2-28.2-2-110.7 0-200.7 90-200.7 200.7s90 200.7 200.7 200.7h108.4v73.9H250.9c-4.3-19.6-21.8-34.4-42.7-34.4-24.1 0-43.7 19.6-43.7 43.7s19.6 43.7 43.7 43.7c20.4 0 37.6-14.1 42.4-33h197v-93.9h66.9v141.3h310.9c4.1 10.8 14.6 18.5 26.8 18.5 15.8 0 28.7-12.8 28.7-28.7 0-16-12.9-28.8-28.7-28.8zm-622.5-9.3c-3.8 8.1-12 13.7-21.5 13.7-13.1 0-23.7-10.6-23.7-23.7s10.6-23.7 23.7-23.7c9.9 0 18.5 6.2 22 14.9 1.1 2.7 1.7 5.7 1.7 8.8 0 3.6-.8 7-2.2 10z"
                    />
                </svg>,
            title: "Облако",
            desc: "Вычисления проводятся на базе высоко- производительного облака"
        },
        {
            icon:
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={128}
                    height={128}
                    className="system-settings-svgrepo-com_svg__icon"
                    viewBox="0 0 1024 1024"
                >
                    <path
                        fill="#FFF"
                        d="m370.1 737.5 13.7 7.3c15.6 8.2 33 15.6 51.3 21.1l14.7 4.6v68.7c0 16.5 11 20.2 20.2 20.2h82.4c9.2 0 20.2-3.7 20.2-20.2v-68.7l14.7-4.6c18.3-5.5 35.7-12.8 51.3-21.1l13.7-7.3 11 11c19.2 19.2 32.1 33 37.6 36.6 4.6 4.6 9.2 7.3 13.7 7.3 8.2 0 15.6-6.4 15.6-7.3l58.6-58.6c6.4-6.4 11.9-17.4 0-29.3l-48.5-48.5 7.3-13.7c8.2-15.6 15.6-33 21.1-51.3l4.6-14.7H842c16.5 0 20.2-11 20.2-20.2v-82.4c0-9.2-3.7-20.2-20.2-20.2h-68.7l-4.6-14.7c-6.4-17.4-12.8-34.8-22-50.4l-7.3-13.7 11-11 37.6-37.6c4.6-4.6 7.3-9.2 7.3-13.7 0-6.4-4.6-12.8-7.3-15.6L729.2 231c-1.8-1.8-8.2-7.3-15.6-7.3-4.6 0-9.2 1.8-13.7 7.3l-48.5 48.5-13.7-7.3c-15.6-8.2-33-15.6-50.4-21.1l-14.7-3.7v-69.6c0-17.4-14.7-20.2-21.1-20.2H470c-6.4 0-20.2 2.7-20.2 20.2v69.6l-14.7 4.6c-17.4 5.5-34.8 11.9-50.4 21.1l-13.7 7.3-49.4-49.4c-4.6-4.6-9.2-6.4-12.8-6.4-7.3 0-14.7 5.5-16.5 7.3l-58.6 57.7c-3.7 4.6-12.8 16.5 0 29.3l48.5 48.6-7.3 13.7c-8.2 15.6-15.6 33-21.1 50.4l-4.6 14.7h-68.7c-16.5.9-20.2 13.7-20.2 22v81.5c0 6.4 2.7 20.2 20.2 20.2h68.7l4.6 14.7c5.5 18.3 12.8 34.8 21.1 51.3l7.3 13.7-48.5 48.5c-11.9 11.9-4.6 23.8 0 29.3l57.7 57.7c1.8.9 9.2 6.4 15.6 6.4 4.6 0 8.2-1.8 12.8-6.4l50.3-47.7z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M496.4 699.1h-.8c-3.5-.3-7-.7-10.5-1.1-5.5-.7-9.3-5.8-8.6-11.3s5.8-9.3 11.3-8.6c3.1.4 6.3.8 9.4 1 5.5.4 9.6 5.3 9.2 10.8-.5 5.3-4.9 9.2-10 9.2zm39.8-1.1c-4.9 0-9.2-3.6-9.9-8.6-.8-5.5 3.1-10.5 8.5-11.3 3.1-.4 6.2-.9 9.3-1.5 5.4-1.1 10.7 2.5 11.7 7.9s-2.5 10.7-7.9 11.7c-3.4.7-6.9 1.3-10.4 1.7-.3.1-.8.1-1.3.1zm-88.5-9.7c-1.2 0-2.3-.2-3.5-.6-3.3-1.2-6.6-2.6-9.8-4-5.1-2.2-7.4-8.1-5.1-13.2 2.2-5.1 8.1-7.4 13.2-5.1 2.9 1.3 5.8 2.5 8.8 3.6 5.2 1.9 7.8 7.7 5.9 12.9-1.6 3.9-5.4 6.4-9.5 6.4zm136.5-3.8c-3.8 0-7.5-2.2-9.2-6-2.2-5.1.1-11 5.1-13.2 2.9-1.3 5.7-2.6 8.5-4 4.9-2.5 10.9-.5 13.4 4.4s.5 10.9-4.4 13.4c-3.1 1.6-6.3 3.1-9.5 4.5-1.2.6-2.5.9-3.9.9zm-180.3-19.9c-2.1 0-4.1-.6-5.9-1.9-2.8-2.1-5.6-4.3-8.3-6.5-4.3-3.5-4.9-9.8-1.4-14.1 3.5-4.3 9.8-4.9 14.1-1.4 2.4 2 4.9 4 7.5 5.8 4.5 3.3 5.4 9.5 2.1 14-2 2.7-5.1 4.1-8.1 4.1zm222.7-6.3c-2.9 0-5.7-1.2-7.7-3.6-3.5-4.3-2.9-10.6 1.3-14.1 2.4-2 4.8-4.1 7.1-6.2 4.1-3.7 10.4-3.5 14.1.6 3.7 4.1 3.5 10.4-.6 14.1-2.6 2.4-5.2 4.7-7.9 6.9-1.8 1.6-4.1 2.3-6.3 2.3zm-258.5-28.4c-3 0-5.9-1.3-7.9-3.8-2.2-2.8-4.3-5.6-6.3-8.5-3.2-4.5-2-10.8 2.5-13.9 4.5-3.2 10.8-2 13.9 2.5 1.8 2.6 3.7 5.1 5.6 7.6 3.4 4.4 2.6 10.6-1.7 14-1.8 1.4-3.9 2.1-6.1 2.1zm292.2-8.2c-2 0-4-.6-5.7-1.8-4.5-3.1-5.7-9.4-2.5-13.9 1.8-2.6 3.5-5.2 5.2-7.9 2.9-4.7 9.1-6.2 13.8-3.3 4.7 2.9 6.2 9.1 3.3 13.8-1.8 3-3.8 5.9-5.8 8.8-2 2.8-5.1 4.3-8.3 4.3zm-317.2-34.9c-3.9 0-7.7-2.3-9.3-6.2-1.3-3.2-2.6-6.6-3.7-9.9-1.8-5.2 1-10.9 6.2-12.7 5.2-1.8 10.9 1 12.7 6.2 1 3 2.1 5.9 3.3 8.8 2.1 5.1-.4 11-5.5 13-1.1.5-2.4.8-3.7.8zm339.8-9.6c-1.1 0-2.2-.2-3.2-.5-5.2-1.8-8-7.5-6.2-12.7 1-3 2-6 2.8-9 1.5-5.3 7-8.4 12.3-6.9 5.3 1.5 8.4 7 6.9 12.3-1 3.4-2 6.8-3.1 10.1-1.5 4.1-5.4 6.7-9.5 6.7zm-352-38.7c-5 0-9.4-3.8-9.9-8.9-.4-3.5-.7-7-.9-10.5-.3-5.5 3.9-10.2 9.4-10.5 5.5-.3 10.2 3.9 10.5 9.4.2 3.1.4 6.3.8 9.4.6 5.5-3.3 10.4-8.8 11-.4.1-.8.1-1.1.1zm361.5-10.2h-.6c-5.5-.3-9.7-5-9.4-10.5.2-3.1.3-6.3.3-9.4 0-5.5 4.5-10 10-10s10 4.5 10 10c0 3.5-.1 7-.3 10.5-.3 5.3-4.7 9.4-10 9.4zm-360.2-39.6c-.5 0-1.1 0-1.6-.1-5.5-.9-9.1-6-8.2-11.5.6-3.5 1.2-6.9 2-10.4 1.2-5.4 6.5-8.8 11.9-7.6 5.4 1.2 8.8 6.5 7.6 11.9-.7 3.1-1.3 6.2-1.8 9.3-.9 4.9-5.1 8.4-9.9 8.4zm357.9-.8c-4.8 0-9-3.5-9.8-8.3-.5-3.1-1.1-6.2-1.8-9.3-1.2-5.4 2.2-10.7 7.5-12 5.4-1.2 10.7 2.2 12 7.5.8 3.4 1.5 6.9 2 10.4.9 5.4-2.8 10.6-8.2 11.5-.6.2-1.1.2-1.7.2zm-343.2-46.8c-1.4 0-2.9-.3-4.3-1-5-2.4-7.1-8.3-4.8-13.3 1.5-3.2 3.1-6.3 4.8-9.4 2.6-4.9 8.7-6.7 13.6-4 4.9 2.6 6.7 8.7 4 13.6-1.5 2.8-2.9 5.6-4.3 8.4-1.6 3.6-5.2 5.7-9 5.7zm328.2-.7c-3.7 0-7.3-2.1-9-5.7-1.3-2.8-2.8-5.7-4.3-8.4-2.6-4.8-.9-10.9 4-13.6 4.8-2.6 10.9-.9 13.6 4 1.7 3.1 3.3 6.2 4.8 9.4 2.4 5 .3 11-4.7 13.3-1.5.7-2.9 1-4.4 1zm-300.9-41.1c-2.3 0-4.7-.8-6.6-2.5-4.2-3.6-4.6-9.9-1-14.1 2.3-2.6 4.7-5.3 7.1-7.8 3.8-4 10.2-4.1 14.1-.2 4 3.8 4.1 10.2.2 14.1-2.2 2.2-4.3 4.6-6.4 7-1.8 2.4-4.6 3.5-7.4 3.5zm273.6-.5c-2.8 0-5.5-1.2-7.5-3.4-2.1-2.4-4.2-4.7-6.4-6.9-3.9-4-3.8-10.3.2-14.1 3.9-3.9 10.3-3.8 14.1.2 2.4 2.5 4.9 5.1 7.2 7.7 3.6 4.2 3.2 10.5-.9 14.1-2.1 1.6-4.4 2.4-6.7 2.4zm-236.1-32.3c-3.3 0-6.4-1.6-8.4-4.5-3-4.6-1.7-10.8 2.9-13.8 2.9-1.9 5.9-3.8 9-5.5 4.8-2.8 10.9-1.1 13.7 3.6 2.8 4.8 1.2 10.9-3.6 13.7-2.7 1.6-5.4 3.2-8 5-1.8 1-3.7 1.5-5.6 1.5zm198.4-.3c-1.9 0-3.8-.5-5.4-1.6-2.6-1.7-5.3-3.4-8.1-4.9-4.8-2.8-6.4-8.9-3.7-13.7s8.9-6.4 13.7-3.7c3 1.7 6.1 3.6 9 5.5 4.6 3 5.9 9.2 2.9 13.8-1.9 3-5.1 4.6-8.4 4.6zm-153.4-21c-4.3 0-8.2-2.7-9.5-7-1.7-5.3 1.3-10.9 6.5-12.5 3.3-1.1 6.8-2 10.1-2.9 5.4-1.4 10.8 1.9 12.2 7.2 1.4 5.4-1.9 10.8-7.2 12.2-3 .8-6.1 1.6-9.1 2.6-1 .2-2 .4-3 .4zM565 345c-1 0-2-.1-3-.5-3-.9-6-1.8-9.1-2.5-5.4-1.3-8.6-6.8-7.3-12.1 1.3-5.4 6.8-8.6 12.1-7.3 3.4.9 6.8 1.8 10.2 2.8 5.3 1.6 8.2 7.2 6.6 12.5-1.3 4.3-5.2 7.1-9.5 7.1zm-59.2-8.1c-5.4 0-9.8-4.3-10-9.7-.2-5.5 4.2-10.1 9.7-10.3 3.5-.1 7.1-.1 10.5 0 5.5.1 9.9 4.7 9.7 10.3-.1 5.4-4.6 9.7-10 9.7h-.3c-3.1-.1-6.3-.1-9.5 0h-.1z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M552.4 879.1H470c-24 0-40.2-16.1-40.2-40.2v-54l-.5-.2c-18.8-5.7-37.2-13.2-54.8-22.5l-1.1-.6-39.7 37.6c-5.3 5.2-13.8 12.1-26.8 12.1-10.9 0-20.1-5.7-24.5-8.5-.2-.1-.3-.2-.5-.3l-2.4-1.2-60.6-60.6-.6-.7c-15.2-18.2-14.7-40.3 1.2-56.3l38.1-38.1-.6-1.1c-7-13.9-15.8-32.6-22.3-54.4l-.2-.5h-54c-27.6 0-40.2-20.8-40.2-40.2V468c0-19.8 12.1-40.5 39-42h55.1l.2-.6c5.8-18.4 13.6-36.9 22.5-53.8l.4-.7-38.1-38.1c-6-6-23.9-27.9-1.5-56l.7-.9 59.5-58.5c1.4-1.4 13.9-13.1 30.5-13.1 9.5 0 19.1 4.4 27 12.3l39 39 .3-.2c18.4-10.8 38.6-17.8 54.1-22.7l.7-.2v-54.9c0-27.6 20.8-40.2 40.2-40.2h81.5c5 0 14.6.9 23.7 6.7 11.2 7.2 17.3 19 17.3 33.4v54l.7.2c18.3 5.8 36.9 13.5 53.7 22.5l.7.4 37.5-37.5c9.8-11.3 20.9-13.8 28.4-13.8 15.3 0 26.6 10.1 29.7 13.2l58.6 58.6c6.4 6.4 13.2 17.5 13.2 29.7 0 9.8-4.4 19.1-13.2 27.9l-38.1 38.1.2.3c10 17 16.7 35.4 23.3 53.2l.5 1.6h54c24 0 40.2 16.1 40.2 40.2v82.4c0 24-16.1 40.2-40.2 40.2h-54l-.2.5c-5.7 18.8-13.2 37.3-22.5 54.8l-.4.7 38.1 38.1c9.7 9.7 14.2 21.6 12.5 33.6-1.2 8.7-5.5 17-12.5 24L745.3 798c-7.1 9-20.5 14.2-30.8 14.2-9.3 0-18.2-4-26.6-11.9-5.2-3.9-11.7-10.5-24.5-23.4-4.3-4.3-9.1-9.2-14.3-14.5l-.5-.5-.7.4c-17.6 9.3-36 16.9-54.8 22.5l-.5.2v54c0 24-16.2 40.1-40.2 40.1zm-82.4-38zm-.2-2h82.6v-83.6l28.9-9c16.4-4.9 32.4-11.5 47.7-19.6l26.8-14.3 21.5 21.5c5.4 5.4 10.2 10.3 14.5 14.7 8.5 8.7 17.4 17.6 20 19.5l1.7 1.1 1.3 1.4.5.5 59.1-59.1c.2-.2.3-.4.5-.5-.1-.2-.3-.3-.5-.5l-59-59 14.3-26.8c8.1-15.2 14.6-31.3 19.6-47.6l.1-.2 9-28.7H842v-82.6h-83.6l-8.8-28.2c-6.2-16.9-12.1-32.8-20.3-46.7l-.4-.7-14.3-26.8 59-59 .5-.5c-.2-.2-.3-.4-.5-.6L715 245.2c-.2-.1-.3-.3-.6-.5L655 303.9l-26.8-14.3c-14.5-7.7-30.6-14.4-46.4-19.5l-29.2-7.3v-85.3c-.4-.1-.7-.1-1.1-.1h-81.6v84.4l-28.7 9c-13.6 4.3-31.2 10.4-46.2 19.2l-.7.4-26.8 14.3-59.7-59.7c-.6.3-1.1.7-1.5 1l-57.5 56.6c-.5.6-.8 1.1-1.1 1.5l.3.3 59 59-14.3 26.8c-7.8 14.7-14.6 30.9-19.6 47l-8.9 28.6h-82.7c-.2 0-.4.1-.6.1-.1.5-.2 1.1-.2 1.9v81.6h83.5l9 28.9c4.4 14.6 10.5 29.4 19.7 47.9l14.2 26.6-59 59-.3.3c.2.4.5.9 1 1.5l55.2 55.2c.6.3 1.4.9 2.3 1.3l60.8-57.5 26.4 14.1c15.2 8.1 31.3 14.6 47.6 19.6l.2.1 28.7 9V839c-.2 0-.2.1-.2.1zm-187.4-36.3zm-35.5-89.7zm529.1-.3zM246.8 303.3zm59.6-57.5-.2.2c.1-.1.2-.1.2-.2zm3-1.5zm-3.2-.4zm406.5-.6zm3.4-.6z"
                    />
                    <path
                        fill="#E6E6E6"
                        d="m655.5 607.1-11-10.2 3.6-6.8c26.9-50.8 17.1-114.6-23.8-155.1-33.6-33.3-82.1-45.7-127-33.5l78.8 78c18.1 17.9 18.2 47.2.3 65.3l-28 28.3c-8.7 8.8-20.2 13.6-32.6 13.7h-.2c-12.2 0-23.8-4.7-32.5-13.4l-78.8-78c-11.7 45 1.2 93.4 34.8 126.7 40.9 40.5 104.8 49.6 155.3 22.2l6.8-3.7 182.1 192.8c5.6 6 13.2 9.3 21.4 9.4 8.2.1 15.9-3.1 21.6-8.9l13.8-13.9c5.8-5.8 8.8-13.5 8.7-21.7-.2-8.2-3.6-15.8-9.6-21.3l-180-166.6-3.7-3.3z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M669.2 592.5c12.3-26.6 16.8-56.8 12.5-85.9 4.3 29.2-.2 59.4-12.5 85.9zm197.7 193c.4 1.6.8 3.2 1.1 4.9-.3-1.7-.6-3.3-1.1-4.9zM672.7 595.8l-3.5-3.3zm-17.2 11.3 3.6 3.4-3.6-3.4zm0 0-11-10.2 11 10.2z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M868 790.4c-.3-1.6-.7-3.3-1.1-4.9-.3-1.1-.6-2.2-1-3.3-2.7-7.5-7.1-14.3-13.1-19.9l-180-166.6-3.5-3.2c12.3-26.6 16.8-56.8 12.5-85.9-4.8-32.8-19.8-62.4-43.4-85.8-43.1-42.6-107.2-55.5-163.4-32.8l-14.1 5.7 101.1 100c5 4.9 7.7 11.5 7.8 18.5 0 7-2.7 13.6-7.6 18.5l-28 28.3c-4.9 5-11.5 7.7-18.5 7.8h-.1c-6.9 0-13.5-2.7-18.4-7.6L396 459.2l-5.5 14.2c-22.1 56.4-8.5 120.4 34.6 163 23.6 23.4 53.4 38 86.2 42.5 29.2 3.9 59.3-.8 85.8-13.4l171.7 181.8c9.4 9.9 22.1 15.5 35.7 15.6h.6c13.4 0 26-5.2 35.5-14.8l13.8-13.9c9.6-9.7 14.7-22.6 14.4-36.2-.1-2.6-.3-5.2-.8-7.6zm-63.3 52.5c-8.2-.1-15.8-3.4-21.4-9.4L601.2 640.7l-6.8 3.7c-50.5 27.4-114.4 18.3-155.3-22.2-33.6-33.3-46.5-81.6-34.8-126.7l78.8 78c8.7 8.6 20.2 13.4 32.5 13.4h.2c12.3-.1 23.9-4.9 32.6-13.7l28-28.3c17.9-18.1 17.8-47.4-.3-65.3l-78.8-78c44.9-12.2 93.4.2 127 33.5 40.9 40.5 50.7 104.2 23.8 155.1l-3.6 6.8 11 10.2 3.6 3.4 180 166.6c6 5.6 9.4 13.1 9.6 21.3.2 8.2-2.9 15.9-8.7 21.7L826.3 834c-5.7 5.8-13.4 8.9-21.6 8.9z"
                    />
                    <path
                        fill="#6a6a6a"
                        d="M838.5 772.8c-2.4 0-4.9-.9-6.8-2.7L668.1 618.7c-4.1-3.8-4.3-10.1-.5-14.1 3.8-4.1 10.1-4.3 14.1-.5l163.6 151.4c4.1 3.8 4.3 10.1.5 14.1-2 2.1-4.7 3.2-7.3 3.2z"
                    />
                </svg>,
            title: "Для любых устройств",
            desc: "Для настройки и запуска расчета подойдет любое устройство с доступом в интернет"
        },
        {
            icon:
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={128}
                    height={128}
                    className="machine-vision-svgrepo-com_svg__icon"
                    viewBox="0 0 1024 1024"
                >
                    <path
                        fill="#FFF"
                        d="M878.3 192.9H145.7c-16.5 0-30 13.5-30 30V706c0 16.5 13.5 30 30 30h732.6c16.5 0 30-13.5 30-30V222.9c0-16.5-13.5-30-30-30z"
                    />
                    <path
                        fill="#E6E6E6"
                        d="M145.7 736h732.6c16.5 0 30-13.5 30-30v-22.1H115.7V706c0 16.6 13.5 30 30 30z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M878.3 152.9H145.7c-38.6 0-70 31.4-70 70V706c0 38.6 31.4 70 70 70h732.6c38.6 0 70-31.4 70-70V222.9c0-38.6-31.4-70-70-70zm30 531V706c0 16.5-13.5 30-30 30H145.7c-16.5 0-30-13.5-30-30V222.9c0-16.5 13.5-30 30-30h732.6c16.5 0 30 13.5 30 30v461zM678 871.1H346c-11 0-20-9-20-20s9-20 20-20h332c11 0 20 9 20 20s-9 20-20 20z"
                    />
                    <path
                        fill="#6a6a6a"
                        d="M127.1 662.7c-2.7 0-5.4-1.1-7.3-3.2-3.7-4.1-3.5-10.4.6-14.1l236.5-219.6L463 541.9l258.9-290.7 183.7 196.3c3.8 4 3.6 10.4-.4 14.1-4 3.8-10.3 3.6-14.1-.4L722.3 280.8l-259 290.9L355.7 454 133.9 660c-2 1.8-4.4 2.7-6.8 2.7z"
                    />
                    <path
                        fill="#D7E7FF"
                        d="M156.4 541.9a82.7 82.8 0 1 0 165.4 0 82.7 82.8 0 1 0-165.4 0Z"
                    />
                    <path
                        fill="#B5CFF4"
                        d="M179.8 541.9a59.3 59.3 0 1 0 118.6 0 59.3 59.3 0 1 0-118.6 0Z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M208.9 541.9a30.2 30.3 0 1 0 60.4 0 30.2 30.3 0 1 0-60.4 0Z"
                    />
                    <path
                        fill="#D7E7FF"
                        d="M580.9 329.9a82.7 82.8 0 1 0 165.4 0 82.7 82.8 0 1 0-165.4 0Z"
                    />
                    <path
                        fill="#B5CFF4"
                        d="M604.3 329.9a59.3 59.3 0 1 0 118.6 0 59.3 59.3 0 1 0-118.6 0Z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M633.4 329.9a30.2 30.3 0 1 0 60.4 0 30.2 30.3 0 1 0-60.4 0Z"
                    />
                    <path
                        fill="#D7E7FF"
                        d="M719.3 539.6a46.3 46.4 0 1 0 92.6 0 46.3 46.4 0 1 0-92.6 0Z"
                    />
                    <path
                        fill="#B5CFF4"
                        d="M732.4 539.6a33.2 33.2 0 1 0 66.4 0 33.2 33.2 0 1 0-66.4 0Z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M748.7 539.6a16.9 17 0 1 0 33.8 0 16.9 17 0 1 0-33.8 0Z"
                    />
                    <path
                        fill="#FFF"
                        d="M436.8 720.1H275.2c-5 0-9-4-9-9s4-9 9-9h161.6c5 0 9 4 9 9 0 4.9-4.1 9-9 9zm-216.2 0h-26.5c-5 0-9-4-9-9s4-9 9-9h26.5c5 0 9 4 9 9 0 4.9-4.1 9-9 9z"
                    />
                </svg>,
            title: "Масштабируемость",
            desc: "Гибкое масштабирование: до 300 ядер на один расчет"
        },
        {
            icon:
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={128}
                    height={128}
                    className="api-interface-svgrepo-com_svg__icon"
                    viewBox="0 0 1024 1024"
                >
                    <path fill="#FFF" d="m432.4 453.5-17 46.7h34.4z" />
                    <path
                        fill="#FFF"
                        d="M725.3 259.7H312.2c-16.5 0-30 13.5-30 30v413.1c0 16.5 13.5 30 30 30h413.1c16.5 0 30-13.5 30-30V289.7c0-16.6-13.5-30-30-30zm-98.8 164.5h25.4V550h-25.4V424.2zm-116.5 0h40.8c15.5 0 25.5.6 30.2 1.9 7.2 1.9 13.2 6 18.1 12.3 4.9 6.3 7.3 14.5 7.3 24.5 0 7.7-1.4 14.2-4.2 19.5s-6.4 9.4-10.7 12.4c-4.3 3-8.7 5-13.2 6-6.1 1.2-14.8 1.8-26.4 1.8h-16.6V550H510V424.2zm-90.7 0h26.9L496.5 550h-27.6l-11-28.6h-50.3L397.2 550h-27l49.1-125.8zm229.1 273.3H352.6c-19.4 0-35.1-15.7-35.1-35.1v-295c0-5.5 4.5-10 10-10s10 4.5 10 10v295c0 8.3 6.8 15.1 15.1 15.1h295.8c5.5 0 10 4.5 10 10s-4.4 10-10 10z"
                    />
                    <path
                        fill="#FFF"
                        d="M569.4 479.2c3.4-1.3 6-3.4 7.9-6.2 1.9-2.8 2.9-6.1 2.9-9.8 0-4.6-1.3-8.4-4-11.3-2.7-3-6.1-4.8-10.2-5.6-3-.6-9.1-.9-18.3-.9h-12.3v35.7h13.9c10 .1 16.7-.6 20.1-1.9z"
                    />
                    <path
                        fill="#6a6a6a"
                        d="M648.4 677.5H352.6c-8.3 0-15.1-6.8-15.1-15.1v-295c0-5.5-4.5-10-10-10s-10 4.5-10 10v295c0 19.4 15.7 35.1 35.1 35.1h295.8c5.5 0 10-4.5 10-10s-4.4-10-10-10z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M865 386.5c11 0 20-9 20-20s-9-20-20-20h-69.7v-56.8c0-38.6-31.4-70-70-70h-27.8v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3H611v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3h-46.5v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3H438v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3h-85.8c-38.6 0-70 31.4-70 70v56.8h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7V433h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7v46.5h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7V606h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7v56.8c0 38.6 31.4 70 70 70H343v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h46.5v72.5c0 11 9 20 20 20s20-9 20-20v-72.5H516v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h46.5v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h82.8c38.6 0 70-31.4 70-70V646H865c11 0 20-9 20-20s-9-20-20-20h-69.7v-46.5H865c11 0 20-9 20-20s-9-20-20-20h-69.7V473H865c11 0 20-9 20-20s-9-20-20-20h-69.7v-46.5H865zM755.3 702.7c0 16.5-13.5 30-30 30H312.2c-16.5 0-30-13.5-30-30v-413c0-16.5 13.5-30 30-30h413.1c16.5 0 30 13.5 30 30v413z"
                    />
                    <path
                        fill="#e66e0d"
                        d="M407.6 521.4h50.3l11 28.6h27.6l-50.4-125.8h-26.9l-49 125.8h27l10.4-28.6zm24.8-67.9 17.3 46.7h-34.3l17-46.7zm103 49.1H552c11.5 0 20.3-.6 26.4-1.8 4.5-1 8.9-3 13.2-6 4.3-3 7.9-7.1 10.7-12.4s4.2-11.8 4.2-19.5c0-10-2.4-18.2-7.3-24.5-4.9-6.3-10.9-10.4-18.1-12.3-4.7-1.3-14.8-1.9-30.2-1.9H510V550h25.4v-47.4zm0-57.1h12.3c9.2 0 15.2.3 18.3.9 4.1.7 7.5 2.6 10.2 5.6 2.7 3 4 6.8 4 11.3 0 3.7-1 7-2.9 9.8-1.9 2.8-4.6 4.9-7.9 6.2-3.4 1.3-10.1 2-20.1 2h-13.9v-35.8zm91.1-21.3h25.4V550h-25.4z"
                    />
                </svg>,
            title: "Открытый API",
            desc: "Возможность строить собственные решения с использованием открытого API"
        },
    ]
    const possibilities = [
        {
            title: "Геометрия",
            desc: "Импорт геометрических моделей из сеточных форматов"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>,
            title: "Сетка",
            desc: "Генерация структурированных и неструктурированных расчетных сеток"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>,
            title: "Решатель",
            desc: "Сжимаемый и несжимаемый решатель. Модели турбулентности: k-ε, k-ω, SST"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>,
            title: "Расчет",
            desc: "Расчет до-, транс-, сверх- и гиперзвуковых трехмерных течений"
        },
    ]

    return (
        <div className='bg-day-50 text-day-350 min-h-[calc(100vh-56px)] max-w-full flex flex-col'>
            <section className="px-4 text-center  mx-auto max-w-screen-xl  items-center 
                lg:flex lg:text-left pt-6 pb-12 md:pt-20 lg:pt-28 lg:pb-28 ">
                <div className="space-y-4 flex-[40%] lg:mr-4">
                    <h1 className="hidden lg:block text-day-350 font-semibold text-3xl xl:text-4xl whitespace-nowrap">
                        <span className="text-orange-100">Облачная</span> платформа для<br />решения газодинамических<br />задач
                    </h1>
                    <h1 className="block lg:hidden text-day-350 font-semibold text-3xl xl:text-4xl ">
                        <span className="text-orange-100">Облачная</span> платформа для решения газодинамических задач
                    </h1>
                    <h3 className="text-day-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                        <span className='font-semibold'> Cloud</span>
                        <span className='font-semibold text-orange-100'>CFD</span> делает процесс инженерного проектирования простым и доступным
                    </h3>
                    <div className="lg:pt-10 pt-5 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                        <button
                            className="cursor-pointer px-7 py-3 w-full text-center shadow-md block sm:w-auto
                    text-white bg-orange-100 hover:bg-orange-150 hover:shadow-lg active:bg-orange-200
                     rounded-lg duration-300"
                            onClick={handleDemoClick}>
                            Получить бесплатный доступ
                        </button>
                    </div>
                </div>
                <div className="flex-[55%] text-center mt-7 lg:mt-0 lg:ml-3 ">
                    <Image src={demo_img} width={2000} height={1000} priority={true} placeholder='blur' alt='preview'
                        className="h-full mx-auto rounded-xl shadow-lg lg:shadow-2xl" />
                </div>
            </section>

            <section className="bg-white px-4 md:px-8 border-t py-12 lg:pt-20 lg:pb-20">
                <div className="max-w-screen-xl mx-auto px-4 text-center  md:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="font-semibold text-2xl xl:text-3xl">
                            Почему<span className='font-semibold'> Cloud</span>
                            <span className='font-semibold text-orange-100'>CFD</span>
                        </h3>
                        <h3 className='text-center'>Больше не нужно инвестировать в дорогостоящее оборудование и программное обеспечение</h3>
                    </div>
                    <div className="mt-12">
                        <ul className="grid gap-y-8 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                            {
                                features.map((item, idx) => (
                                    <li key={idx} className="cursor-pointer space-y-3 border p-4 rounded-lg
                                    hover:shadow-md duration-300 group hover:-translate-y-[5px] bg-day-50">
                                        <div className="w-32 h-32 mx-auto flex items-center justify-center text-orange-100">
                                            {item.icon}
                                        </div>
                                        <h4 className="duration-300 text-lg group-hover:text-orange-100 font-semibold">
                                            {item.title}
                                        </h4>
                                        <p>
                                            {item.desc}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section >

            <section className="bg-day-50 px-4 md:px-8 border-t py-12 lg:pt-20 lg:pb-20">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-center font-semibold text-2xl xl:text-3xl">
                            Как работает<span className='font-semibold'> Cloud</span>
                            <span className='font-semibold text-orange-100'>CFD</span>
                        </h3>
                        <h3 className='text-center'>Простой и понятный интерфейс поможет пройти весь процесс инженерного проектирования</h3>
                    </div>
                    <div className="mt-12">
                        <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-1 lg:grid-cols-2 ">
                            {
                                possibilities.map((item, idx) => (
                                    <li key={idx} className="cursor-pointer flex gap-x-4 bg-white p-4 border rounded-lg 
                                    hover:shadow-md duration-300 group hover:-translate-y-[5px]">
                                        <div className="flex-none w-12 h-12 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={800}
                                                height={800}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle cx={12} cy={12} r={9} fill="#6a6a6a" fillOpacity={0.24} />
                                                <path
                                                    stroke="#e66e0d"
                                                    strokeLinecap="round"
                                                    strokeWidth={1.2}
                                                    d="m9 10 3.258 2.444a1 1 0 0 0 1.353-.142L20 5"
                                                />
                                                <path
                                                    stroke="#3f3f3f"
                                                    strokeLinecap="round"
                                                    strokeWidth={1.2}
                                                    d="M21 12a9 9 0 1 1-6.67-8.693"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="duration-300 group-hover:text-orange-100 text-lg font-semibold">
                                                {item.title}
                                            </h4>
                                            <p className="mt-3">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 md:px-8 border-t py-12 lg:pt-20 lg:pb-20" id='demo'>
                <div className="max-w-screen-xl mx-auto px-4  md:px-8">
                    <div className="max-w-lg mx-auto space-y-3 text-center">
                        <h3 className="font-semibold text-2xl xl:text-3xl">
                            Запросить <span className='font-semibold text-orange-100'>бесплатный</span> доступ
                        </h3>
                        {done ? <><p className='text-center'>
                            Спасибо. Мы скоро с вами свяжемся!
                        </p></> :
                            <p>
                                Оставьте свои контакты, чтобы начать использовать
                                <span className='font-semibold'> Cloud</span>
                                <span className='font-semibold text-orange-100'>CFD</span>
                            </p>
                        }

                    </div>
                    <div className="mt-6 max-w-lg mx-auto">
                        {done ? '' :
                            <form onSubmit={handleFormSubmit} className="space-y-5 border px-4 py-8 rounded-lg shadow-md
                                    bg-day-50" >
                                <div>
                                    <label htmlFor='name' className="font-medium">
                                        Имя
                                    </label>
                                    <input name='name' type="text" required value={formData.fio}
                                        onChange={e => setFormData(prev => ({ ...prev, fio: e.target.value }))}
                                        className="w-full mt-2 px-3 py-2 bg-day-00 outline-none 
                                        border focus:border-indigo-600 shadow-sm rounded-lg" />
                                </div>
                                <div>
                                    <label htmlFor='company' className="font-medium">
                                        Организация
                                    </label>
                                    <input name='company' type="text" required value={formData.company}
                                        onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                        className="w-full mt-2 px-3 py-2 bg-day-00 outline-none 
                                        border focus:border-indigo-600 shadow-sm rounded-lg"/>
                                </div>
                                <div>
                                    <label htmlFor='email' className="font-medium">
                                        Email
                                    </label>
                                    <input name='email' type="email" required value={formData.email}
                                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full mt-2 px-3 py-2 bg-day-00 outline-none border 
                                    focus:border-indigo-600 shadow-sm rounded-lg" />
                                </div>
                                <div>
                                    <label className="font-medium" htmlFor='phoneNumber'>
                                        Номер телефона
                                    </label>

                                    <input type="tel"
                                        name='phoneNumber' id='phoneNumber'
                                        placeholder="+7 (999) 999-99-99" value={formData.phoneNumber}
                                        onChange={e => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                        required
                                        className="w-full px-3 py-2 appearance-none bg-day-00 outline-none border 
                                            focus:border-indigo-600 shadow-sm rounded-lg" />

                                </div>
                                {/* <p className='text-xs'>Нажимая на кнопку «Отправить», вы даете согласие на обработку персональных данных.
                                    Подробнее об обработке данных читайте в  Политике.</p> */}
                                <button type='submit'
                                    className="w-full px-4 py-2 text-white font-medium shadow-md
                                    bg-orange-100 hover:bg-orange-150 hover:shadow-lg active:bg-orange-200 
                                    rounded-lg duration-150">
                                    Отправить
                                </button>
                            </form>}
                    </div>
                </div>
            </section>

            <footer className="lg:pt-10 lg:pb-10 px-4 md:px-8 py-6 border-t flex flex-col items-center space-y-2 
                bg-day-50 w-full"
                id='contacts'>
                <p className='text-orange-100 font-semibold'>Контакты</p>
                <a href="mailto:cloud.platform@mail.ru" className="flex md:hidden text-gray-400 space-x-2 flex-row w-full items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <p className='text-day-350'>cloud.platform@mail.ru</p>
                </a>
                <div className='w-full flex flex-row items-top justify-between'>
                    <p className='text-sm text-day-300 flex-1 pr-3'>
                        При поддержке Фонда содействия инновациям
                    </p>
                    <a href="mailto:cloud.platform@mail.ru" className="hidden md:flex flex-1 text-gray-400 space-x-2 flex-row w-full items-top justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <p className='text-day-350'>cloud.platform@mail.ru</p>
                    </a>
                    {/* <p className='flex-1 text-sm text-day-300 text-right pl-3'>
                        Политика обработки персональных данных
                    </p> */}
                </div>
            </footer>
        </div >

    )
}
