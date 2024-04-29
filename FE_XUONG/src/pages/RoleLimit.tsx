import { Services } from "@/components";

const RoleLimit = () => {
    return (
        <>

            <h1 style={{ color: 'red', textAlign: 'center', fontWeight: 700 }}>Bạn không đủ quyền truy cập trang này, vui lòng quay trở lại !</h1>
            <Services />
        </>
    );
};

export default RoleLimit;
