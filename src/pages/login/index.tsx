import Login from "@/components/admin/Login";
import useAuth from "@/hooks/use-auth";
import { LoginParams } from "@/utils/types";

const LoginPage: React.FC = () => {
  const { handleAdminLogin, errors } = useAuth();

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
