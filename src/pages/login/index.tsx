import Login from "@/components/admin/Login";
import useAdmin from "@/hooks/use-admin";
import useAuthorization from "@/hooks/use-authorization";
import { LoginParams } from "@/types";
import SideMenuBar from "@/components/menu/SideMenuBar";

const LoginPage: React.FC = () => {
  const { handleAdminLogin, errors } = useAdmin();
  useAuthorization();

  return (
    <div className="block lg:flex">
      <SideMenuBar />
      <section className="p-6 sm:py-16 sm:px-20 w-full h-screen">
        <Login
          onLogin={(params: LoginParams) => handleAdminLogin(params)}
          errorMessage={errors}
        />
      </section>
    </div>
  );
};

export default LoginPage;
