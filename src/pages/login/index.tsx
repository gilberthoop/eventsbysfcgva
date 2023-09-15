import Login from "@/components/admin/Login";
import useAdmin from "@/hooks/use-admin";
import { LoginParams } from "@/types";

const LoginPage: React.FC = () => {
  const { handleAdminLogin, errors } = useAdmin();

  return (
    <section className="p-6 sm:py-16 sm:px-20">
      <Login
        onLogin={(params: LoginParams) => handleAdminLogin(params)}
        errorMessage={errors}
      />
    </section>
  );
};

export default LoginPage;
