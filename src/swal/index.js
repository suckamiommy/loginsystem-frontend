import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

const fixSwal = {
    loading(title, content){
        Swal.fire({
            title: title,
            html: content,
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    },
    close(){
        Swal.close();
    },
    success(message){
        return Swal.fire("Success", message, "success");
    },
    error(message){
        Swal.fire("Error", message, "error");
    },
    toastSuccess(title){
        Toast.fire({
            icon: 'success',
            title: title
        });
    },
    toastError(title){
        Toast.fire({
            icon: 'error',
            title: title
        });
    }
}

export default fixSwal;

