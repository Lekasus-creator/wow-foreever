-- 25.10.2026: Einmal bestätigte Wünsche bleiben geschlossen; nur der Einreicher kann vor dem Abschluss nachbessern verlangen.
CREATE OR REPLACE FUNCTION public.forever_wish_action(p_wish_id bigint, p_action text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  owner_id uuid;
  old_status text;
  next_status text;
BEGIN
  IF NOT private.forever_is_member() THEN
    RAISE EXCEPTION 'Nicht berechtigt';
  END IF;
  SELECT user_id,status INTO owner_id,old_status
    FROM public.forever_wishes WHERE id=p_wish_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Wunsch nicht gefunden'; END IF;
  IF p_action='bestätigen' AND owner_id=(SELECT auth.uid()) AND old_status='Wartet auf Bestätigung' THEN
    next_status:='Geschlossen';
  ELSIF p_action='nachbessern' AND owner_id=(SELECT auth.uid()) AND old_status='Wartet auf Bestätigung' THEN
    next_status:='Nachbesserung erforderlich';
  ELSIF old_status<>'Geschlossen' AND private.forever_is_admin()
      AND p_action IN ('Offen','In Prüfung','In Umsetzung','Wartet auf Bestätigung','Nachbesserung erforderlich','Zurückgestellt') THEN
    next_status:=p_action;
  ELSE
    RAISE EXCEPTION 'Diese Statusänderung ist nicht erlaubt';
  END IF;
  UPDATE public.forever_wishes
     SET status=next_status,updated_at=now() WHERE id=p_wish_id;
  RETURN next_status;
END
$function$;
