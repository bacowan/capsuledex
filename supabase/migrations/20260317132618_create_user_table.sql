create table user_profile (
    id bigint primary key generated always as identity,
    public_id UUID not null,
    is_collection_public boolean not null default false
);

-- trigger function
CREATE OR REPLACE FUNCTION sync_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.user_profile (public_id)
    VALUES (NEW.id);
  ELSIF TG_OP = 'DELETE' THEN
    DELETE FROM public.profiles WHERE id = OLD.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- attach trigger to auth.users
CREATE TRIGGER on_auth_user_changed
AFTER INSERT OR UPDATE OR DELETE ON auth.users
FOR EACH ROW EXECUTE FUNCTION sync_user_profile();