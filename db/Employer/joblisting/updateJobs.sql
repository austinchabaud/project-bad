update jobs
set title = $2, company = $3, city = $4, state = $5, description = $6, languages = $7 date_added = $8
where id = $1;

select *from jobs;