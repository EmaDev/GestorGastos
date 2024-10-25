import Swal, { SweetAlertIcon } from 'sweetalert2';

export const useAlert = () => {

    const showAlert = (title:string, html: string = "", icon: SweetAlertIcon = "success",callback:any = () => {} ) => {
        Swal.fire({
            position: "top-end",
            icon,
            title,
            html,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: false
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                callback()
            }
        });
    }

    return { showAlert }
}
